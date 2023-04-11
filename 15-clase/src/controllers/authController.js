import passport from "passport"

export async function controllerGetLogForm(req, res) {
    if (!req.session.username) {
        res.redirect('/login')
    } else {
        res.redirect('/home')
    }
}

export async function controllerGetLogin(req, res) {
    await res.render('login')
}
export async function controllerGetErrorLogin(req, res) {
    await res.render('errorLogin')
}

/* export async function controllerPostLogin(req, res) {
    const username = req.body.username;
    req.session.username = username;
    res.cookie('username', username);
    res.redirect('/')
} */



export async function controllerPostLogout(req, res) {
    const userName = req.cookies.username
    let data = {}
    data.username = userName
    req.session.destroy((err) => {
        res.render('logout', { data })
    })
}

