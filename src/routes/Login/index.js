const User = require(`../../libs/User`);

module.exports = async function (req, res) {
    console.log(req.body);
    if (req.body.Logintype == `Register`) {
        const user = await User.create(
            req.body.username,
            req.body.password
        );

        res.render(`index`, {
            user,
            message: `New user created`,
            hiddenRow: `<div class="form-group">
                        <input id="indexUserId" class="form-control" name="userId" type="hidden" value="${ user.id } " />
                </div>`
        });
    } else {
        try {
            const user = await User.login(
                req.body.username,
                req.body.password
            );

            return res.render(`index`, {
                user,
                message: `Login successful`,
                hiddenRow: `<div class="form-group">
                        <input id="indexUserId" class="form-control" name="userId" type="hidden" value="${ user.id} " />
                </div>`
            });
        } catch (err) {
            res.render(`login`, {
                err: `Failed to login. Please check details`
            });
        }
    }
};