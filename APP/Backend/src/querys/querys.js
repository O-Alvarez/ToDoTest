const querys = {
    "user":{
        "create": "insert into users (first_name, last_name, mail, password_hash) values (? , ? , ? , ?)",
        "getBymail": "select id_user, password_hash, first_name, mail from users where mail = ?",
        "getById": "select id_user, first_name, last_name, mail, password_hash from users where id_user = ?",
        "update":"update users set first_name = ? , last_name = ?, mail = ? where id_user = ?" ,
        "updatePassword": "update users set password_hash = ? where id_user = ?",
        "delete": "delete from users where id_user = ?"
    },
    "projects":{
        "create": "insert into projects(id_user, title, description, status ,expiration_date ) values (? , ? , ? , ?, ?)",
        "getLastCreated": "select * from projects where id_user = ? order by created_at desc limit 1",
        "getLastUpdate": "select * from projects where id_user = ? order by update_at desc limit 1",
        "getAllDefeated": "select * from projects where id_user = ? and expiration_date < NOW() order by created_at asc",
        "getById": "select * from projects where (id_project = ? and id_user = ?) or (id_project = ? and ispublic = true)",
        "getAllByUser": "select * from projects where id_user = ? order by created_at desc",
        "update": "UPDATE projects SET title = ?, description = ?, status = ?, ispublic = ?, expiration_date = ? WHERE id_project = ? AND id_user = ?;",
        "delete": "delete from projects where id_project = ? and id_user = ? "
    },
    "categories":{
       "create":"insert into categories(id_project, description, color) values (? , ? , ?)",
       "getLastCategory": "select * from categories where id_project = ? order by created_at desc limit 1",
       "getByID": "",
       "getAllByProject": "",
       "update": "",
       "delete": ""

    },
    "tasks":{
        "create": "insert into tasks(id_project, id_category, title, description, priority, expiration_date) values (? , ? , ? , ? , ? , ?) ",
        "getById": "",
        "getAllByProject": "",
        "update": "",
        "delete": ""
    },
    "sessions":{
        "create": "insert into sessions(id_user, token, user_agent, ip_address, expiration_date) values (? , ? , ? , ? , ?)",
        "getByToken": "select id_user, token, expiration_date, status from sessions WHERE token = ? AND status = true AND expiration_date > NOW()",
        "getByUser":"select id_user, token, expiration_date, status from sessions where id_user = ? and status = true and expiration_date > NOW() ",
        "closeAllSessionsByUser":"update sessions SET status = false WHERE id_user = ? AND status = true",
        "closeSessionByToken": "UPDATE sessions SET status = false WHERE token = ?",
        "update": ""
    }
}

export default querys