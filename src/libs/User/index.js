const { Users } = require(`../Database`);

exports.login = (username, password) => {
    return Users.where({
        username
    })
        .fetch()
        .then(user => {
            user = user.toJSON();
            if (user) {
                if (user.password == password) {
                    return user;
                } else {
                    throw new Error(`Password does not match`);
                }
            } else {
                throw new Error(`User does not exist`);
            }
        });
};

exports.addDetails = (id, first_name, last_name, email) => {
    return Users.where({
        id
    })
        .fetch({
            require: true
        })
        .then(user => {
            user.set(`first_name`, first_name);
            user.set(`last_name`, last_name);
            user.set(`email`, email);

            return user.save();
        })
        .then(obj => obj.toJSON());
};

exports.checkDetails = (id) => {
    return Users.where({
        id
    })
        .fetch({
            require: true
        })
        .then(user => {
            if (user.first_name || user.last_name || user.email) {
                return user;
            } else {
                return {};
            }
        });
};

exports.create = (username, password) => {
    let id = (Math.floor(Math.random() * 200) + 1);
    console.log(username, password, id)
    return new Users({
        id,
        username,
        password
    })
    .save(null, { method: `insert` });
}