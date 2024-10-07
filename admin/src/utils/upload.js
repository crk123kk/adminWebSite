import axios from "axios";

function upload(path, userForm) {

    // form表单的数据要封装一下，因为有文件数据
    const params = new FormData()

    for (let key in userForm) {
        params.append(key, userForm[key])
    }

    return axios.post(
        path,
        params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data
    })

}

export default upload;