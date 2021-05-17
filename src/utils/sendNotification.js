let sendNotification = async function (app, title, body, data, fcmIds, tag) {
    let FCM = require('fcm-node');
    let serverKey = app.get('fcm-server-key');
    let fcm = new FCM(serverKey);
    data.click_action = 'FLUTTER_NOTIFICATION_CLICK';
    // data.main_picture = image;
    ////Console.log(fcmIds);
    // fcmIds = ['eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJfaWQiOiI1ZWNlYWRhMjBlMjVkMDc0ZDBmZTVkNDMiLCJsYXN0TmFtZSI6Im1vaGFwYXRyYSIsInBob25lIjoiODI0OTAzNTM3NyIsImJsb2NrZWQiOmZhbHNlLCJibG9ja2VkQnkiOm51bGwsInJvbGUiOjIsImVtYWlsVmVyaWZpZWQiOmZhbHNlLCJwcmVtaXVtIjpmYWxzZSwiYXZhdGFyIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2pEMi1ZYU82R1ZEWi01bWdBM2tKLXAxRDI1UGJnNFhCTTVTdFczaUgwPXM5Ni1jIiwiaXNWZW5kb3IiOmZhbHNlLCJhcHByb3ZlZCI6ZmFsc2UsImlzUHJvZmVzc2lvbmFsIjpmYWxzZSwiZmlyc3ROYW1lIjoiZGFkdSIsImVtYWlsIjoibW9oYXBhdHJhZGFkdUBnbWFpbC5jb20iLCJnb29nbGVJZCI6IjExNzc5Njk3MDI3MDQ4Nzc4MjE5NyIsImZjbUlkIjoiY3hxRVBOQ18yYlE6QVBBOTFiRVRHTVRQMWRSbFNaR2tpZndFUkFNMG1OTWNfMFlqTkdKS2hXTDZUZnhRTlhDOEdjOHl5N0toT2p0cHlHbGxJS1dMQl90c0drQ2R2UnhpR2xIUXk0X2VlZmlRQ3JrWDNqOU1PeklnN2t6RTdXbllTM3VlUGVoUEpKZXUzdjVLVlBpM3hHRmQiLCJyZWZlcnJhbENvZGUiOiJEU2lPSTIiLCJjcmVhdGVkQXQiOiIyMDIwLTA1LTI3VDE4OjEyOjUwLjc1NFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTA1LTI5VDE1OjEzOjUxLjk2OFoiLCJfX3YiOjAsInN1YiI6IjVlY2VhZGEyMGUyNWQwNzRkMGZlNWQ0MyIsImlhdCI6MTU5MTUxODgyNSwiZXhwIjoxNj'];
    let message = {
        registration_ids: fcmIds,
        notification: {
            title: title,
            body: body,
            tag,
            // image: image,
        },
        data: data,
    };
    // console.log(message);

    fcm.send(message, (err, response) => {
        if (err) {
            return null;
        } else {
            return response;
        }
    });
};
export default sendNotification;
