/**
 * Created By Soumya(soumya@smarttersstudio.com) on 03/07/21 at 11:34 AM.
 */
import { CronJob } from 'cron';
import moment from 'moment';

const ScheduleTaskForCleaners = async (app) => {
    const job = new CronJob('0 */1 * * * *', async function () {
        const binService = app.service('bin');
        const userService = app.service('user');
        const taskService = app.service('task');

        const nowDate = new Date();

        const cleaners = await userService
            ._find({
                query: {
                    role: 1,
                    status: 1,
                },
                paginate: false,
            })
            .then((res) => res.map((each) => each._id));

        for (const each of cleaners) {
            const todayTasks = await taskService
                ._find({
                    query: {
                        worker: each,
                        date: {
                            $gte: moment(nowDate).startOf('day').toDate(),
                            $lte: moment(nowDate).endOf('day').toDate(),
                        },
                        $select: ['_id'],
                    },
                    paginate: false,
                })
                .then((res) => res.length);

            if (!todayTasks) {
                const assignedBins = await binService
                    ._find({
                        query: {
                            type: 2,
                            worker: each,
                            status: 1,
                        },
                        paginate: false,
                    })
                    .then((res) => res.map((each) => each._id));

                if (assignedBins.length) {
                    const taskData = assignedBins.map((bin) => {
                        return {
                            worker: each,
                            bin: bin,
                            date: nowDate,
                            type: 1,
                        };
                    });

                    await taskService._create(taskData);
                }
            }
        }
    });
    job.start();
};

export default ScheduleTaskForCleaners;
