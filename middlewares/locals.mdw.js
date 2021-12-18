export default function (app) {
  app.use(async function (req, res, next) {
    res.locals.isManageUser = false;
    res.locals.isManageReport = false;
    res.locals.isManageUpdate = false;
    next();
  });


}