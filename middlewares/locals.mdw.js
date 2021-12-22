export default function (app) {
  app.use(async function (req, res, next) {
    res.locals.isManageUser = false;
    res.locals.isManageReport = false;
    res.locals.isManageUpdate = false;
    next();
  });

  app.use(async function (req, res, next) {

    if (typeof (req.session.auth) === 'undefined') {
      req.session.auth = false;
    }

    if (typeof (req.session.cart) === 'undefined'){
      req.session.cart = [];
    }

    res.locals.auth = req.session.auth;
    res.locals.authUser = req.session.authUser;
    next();
  });
}