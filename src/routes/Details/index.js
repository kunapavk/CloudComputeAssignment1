const User = require(`../../libs/User`);

module.exports = async function (req, res) {
    console.log(req.body);
    const user = await User.addDetails(
        req.body.userId,
        req.body.userFirstname,
        req.body.userLastname,
        req.body.userEmail
    );

    console.log(user);

    res.render(`index`, {
        user,
        message: `New user created`,
        hiddenRow: `<div class="form-group">
                        <input id="indexUserId" class="form-control" name="userId" type="hidden" value="${ user.id} " />
                </div>`
    });
}