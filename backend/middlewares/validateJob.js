const validateJob= (req,res,next) => {
      if (!req.body.title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    if (!req.body.company) {
        return res.status(400).json({
            message: "Company is required"
        });
    }

    if (!req.body.location) {
        return res.status(400).json({
            message: "Location is required"
        });
    }
    next();   
}

module.exports = validateJob;