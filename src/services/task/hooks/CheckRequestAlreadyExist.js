/**
 * Created By Soumya(soumya@smarttersstudio.com) on 03/07/21 at 5:35 PM.
 */
import { BadRequest } from '@feathersjs/errors';
import moment from 'moment';

const CheckRequestAlreadyExist = () => async (context) => {
    const { data, app, params } = context;

    const { binId } = data;

    const { user } = params;

    if (binId) {
        const binData = await app
            .service('bin')
            ._find({
                query: {
                    binId,
                    status: 1,
                    $limit: 1,
                    worker: { $ne: null },
                    type: user.role === 1 ? 1 : { $in: [1, 2] },
                },
            })
            .then((res) => (res.total ? res.data[0] : null));

        if (!binData) throw new BadRequest('Please Check again the Bin Id.');

        if (new Date().getHours() > 19) throw new BadRequest('You can not request at this time.');

        const parentBinId = binData._id;
        const worker = binData.worker;
        const date = moment(new Date()).add(1, 'day').toDate();

        const requestExists = await app
            .service('task')
            ._find({
                query: {
                    bin: parentBinId,
                    worker,
                    date: {
                        $gte: moment(new Date()).add(1, 'day').startOf('day').toDate(),
                        $lte: moment(new Date()).add(1, 'day').endOf('day').toDate(),
                    },
                    $limit: 1,
                },
            })
            .then((res) => (res.total ? res.data[0] : null));

        if (requestExists) {
            context.result = requestExists;
        } else {
            data.bin = parentBinId;
            data.worker = worker;
            data.date = date;
        }
    }

    return context;
};

export default CheckRequestAlreadyExist;
