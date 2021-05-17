const GetAllBankAccounts = () => async (context) => {
    const { result, app } = context;

    const {
        user: { _id: user, role },
    } = result;

    if (role === 1) {
        context.result.accounts = await app.service('account')._find({
            query: {
                user,
                status: { $ne: 0 },
            },
            paginate: false,
        });
    }
};

export default GetAllBankAccounts;
