/**
 * Created By Soumya(soumya@smarttersstudio.com) on 06/07/21 at 12:46 AM.
 */
import axios from 'axios';

const GetBinAddress = () => async (context) => {
    const { app, result } = context;

    const { coordinates } = result;

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

    context.result.currentAddress = data ? data.display_name : 'Wrong Coordinates';
};

export default GetBinAddress;
