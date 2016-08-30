import classnames from 'classnames';

const columns = (specs) => {
    const temp = {};

    if (specs) {
        const classes = {
            xs: specs.xs || null,
            sm: specs.sm || null,
            md: specs.md || null,
            lg: specs.lg || null,
        };


        temp[`col-xs-${classes.xs}`] = classes.xs;
        temp[`col-sm-${classes.sm}`] = classes.sm;
        temp[`col-md-${classes.md}`] = classes.md;
        temp[`col-lg-${classes.lg}`] = classes.lg;
    }

    return classnames(temp);
};

export default columns;
