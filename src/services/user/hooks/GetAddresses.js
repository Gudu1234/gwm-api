/**
 * Created By Soumya(soumya@smarttersstudio.com) on 05/07/21 at 11:49 PM.
 */
import axios from 'axios';

const GetAddresses = () => async (context) => {
    const { params, app } = context;

    const {
        query: { coordinatesUpdatedAt },
    } = params;

    if (coordinatesUpdatedAt) {
        for (const each of context.result) {
            const { coordinates } = each;

            const latitude = coordinates[1];
            const longitude = coordinates[0];
            const apiKey = app.get('location_fetch');

            const url = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;
            const config = {
                method: 'get',
                url,
                headers: {},
            };
            // eslint-disable-next-line no-unused-vars
            const { data } = await axios(config).catch((e) => {
                // console.log(e);
                return null;
            });

            each.currentAddress = data ? data.display_name : 'Wrong Coordinates';
        }
    }
};

export default GetAddresses;
