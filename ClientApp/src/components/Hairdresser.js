import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 120,
    },
    media: {
        objectFit: 'cover'
    },
    selected: {
        backgroundColor: "rgba(0, 121, 107, 0.1)",
        boxShadow: "1px 3px 3px rgba(0, 121, 107, 0.6)"
    }
};

class Hairdresser extends React.Component {
    onHairdresserClick() {
        this.props.selectHairdresser(this.props.hairdresser);
    }

    render() {
        const { classes } = this.props;
        const alt = this.props.hairdresser === null ? '' : "Hairdresser " + this.props.hairdresser.id;
        const image = this.props.hairdresser === null ? "static/images/hairdressers/" + "qm.jpg" : "static/images/hairdressers/" + this.props.hairdresser.id + ".jpg";
        const selected = this.props.selectedHairdresser === this.props.hairdresser ? classes.selected : '';
        const name = this.props.hairdresser === null ? 'Random' : this.props.hairdresser.name;
        return (
            <Card className={classes.card + " " + selected} onClick={this.onHairdresserClick.bind(this)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={alt}
                        className={classes.media}
                        height="140"
                        image={image}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }


}

export default withStyles(styles)(Hairdresser);
