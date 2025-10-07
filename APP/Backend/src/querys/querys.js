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
        "create": "insert into projects(id_user, title, description, status, ispublic ,expiration_date ) values (?, ? , ? , ? , ?, ?)",
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
       "getByID": "SELECT c.id_category, c.id_project, p.id_user, p.ispublic, c.description, c.color FROM categories c inner join projects p on c.id_project = p.id_project  where (c.id_category = ? )",
       "getAllByProject": "SELECT 	c.id_category, c.id_project, p.id_user, p.ispublic, c.description, c.color	FROM categories c inner join projects p on c.id_project = p.id_project  where (p.id_project = ? )",
       "update": "update categories set description = ? , color = ? where id_category = ?",
       "delte": "delete from categories where id_category = ?"

    },
    "tasks":{
        "create": "INSERT INTO tasks(id_project, id_category, title, description, priority, expiration_date) VALUES (? , ? , ? , ? , ? , ?) ",
        "getById": "select t.id_task, c.id_category, p.id_project, p.id_user, p.ispublic, t.title, t.description, t.priority, t.expiration_date, t.created_at, t.update_at, c.description as category, p.title as project  from tasks t inner join categories c on t.id_category = c.id_category inner join projects p on t.id_project = p.id_project where t.id_task = ?",
        "getAllByCategory": "select t.id_task, c.id_category, p.id_project, p.id_user , p.ispublic, t.title, t.description, t.priority, t.expiration_date, t.created_at, t.update_at, c.description as category, p.title as project  from tasks t inner join categories c on t.id_category = c.id_category inner join projects p on t.id_project = p.id_project where c.id_category = ?",
        "getAllByProject": "select t.id_task, c.id_category, p.id_project, p.id_user, p.ispublic, t.title, t.description, t.priority, t.expiration_date, t.created_at, t.update_at, c.description as category, p.title as project  from tasks t inner join categories c on t.id_category = c.id_category inner join projects p on t.id_project = p.id_project where p.id_project = ?",
        "delete": "delete from tasks where id_task = ?",
        "update": "update from tasks set title = ?, description = ?, priority = ?, expiration_date = ? where id_task = ?"
    },
    "sessions":{
        "create": "insert into sessions(id_user, token, user_agent, ip_address, expiration_date) values (? , ? , ? , ? , ?)",
        "getByToken": "SELECT s.id_user,  s.token,  s.expiration_date,  s.status,  u.first_name, u.last_name, u.mail FROM sessions s INNER JOIN users u ON s.id_user = u.id_user WHERE s.token = ? AND s.status = true AND s.expiration_date > NOW()",
        "getByUser":"select id_user, token, expiration_date, status from sessions where id_user = ? and status = true and expiration_date > NOW() ",
        "closeAllSessionsByUser":"update sessions SET status = false WHERE id_user = ? AND status = true",
        "closeSessionByToken": "UPDATE sessions SET status = false WHERE token = ?",
        "update": ""
    }
}

export default querys