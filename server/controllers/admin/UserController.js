const UserService = require("../../services/admin/UserService")
const JWT = require('../../utils/JWT')


const UserController = {
    login: async (req, res) => {
        console.log(req.body);
        const result = await UserService.login(req.body)

        if (result.length === 0) {
            res.send({
                code: 0,
                message: "用户名或密码错误"
            })
        } else {
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username,
            }, '1d')
            res.header('Authorization', token)
            const { username, gender, introduction, avatar, role } = result[0]
            res.send({
                ActionType: 'OK',
                data: {
                    username,
                    gender: gender ? gender : 0,
                    introduction,
                    avatar,
                    role
                }
            })
        }
    },

    upload: async (req, res) => {
        const { username, introduction, gender } = req.body

        // 调用 service 模块更新数据
        const token = req.headers['authorization'].split(' ')[1]
        // 从 token 获取 用户id
        const payload = JWT.verify(token)
        const { _id } = payload

        // 上传文件的路径(这里放在了静态资源中，不需要带上public,express处理估了)
        // console.log('req.file.filename111', req.body)
        // 当没有上传文件的时候，就不需要更新数据库，并且不回传到前端，让前端用之前的数据
        const avatar = req.file ? `/avatarUploads/${req.file.filename}` : ''

        await UserService.upload({
            _id,
            username,
            introduction,
            gender: Number(gender),
            avatar
        })
        // 之所以字段都不传，是因为前端vuex中如果已经保存了，通过解构，空字符串会覆盖前面的字段，所以直接字段都不返回，避免覆盖
        if (avatar) {
            res.send({
                ActionType: 'OK',
                data: {
                    username,
                    gender: Number(gender),
                    introduction,
                    avatar
                }
            })
        } else {
            res.send({
                ActionType: 'OK',
                data: {
                    username,
                    gender: Number(gender),
                    introduction,
                }
            })
        }

    },

    add: async (req, res) => {

        const { username, introduction, gender, role, password } = req.body

        const avatar = req.file ? `/avatarUploads/${req.file.filename}` : ''

        await UserService.add({
            username,
            password,
            role: Number(role),
            introduction,
            gender: Number(gender),
            avatar
        })

        res.send({
            ActionType: 'OK',
        })
    },

    getList: async (req, res) => {
        const result = await UserService.getList(req.params)
        res.send({
            ActionType: 'OK',
            data: result
        })
    },

    delList: async (req, res) => {
        // 这个 id 是根据路由上的 参数名，而不是根据其他比如传来的是_id还是什么
        // console.log('req. :>> ', req.params.id);
        const { id } = req.params
        await UserService.delList({ _id: id })
        res.send({
            ActionType: 'OK'
        })
    },

    putList: async (req, res) => {
        await UserService.putList(req.body)
        res.send({
            ActionType: 'OK'
        })
    },
}

module.exports = UserController