import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import { Link } from 'react-router-dom'


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  title: {
    textAlign: 'center'
  },
  image: {
    position: 'relative',
    height: 600,
    marginTop: 100,
    [theme.breakpoints.down('xs')]: {
      height: 300,
      marginTop: 20,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 180,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 90px)',
    transition: theme.transitions.create('opacity'),
  },
});

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        width: "100%",
        fontSize: 18,
      }
    },
    MuiInput: {
      root: {
        fontSize: 18,
        width: "calc(100% - 24px')"
      },
      input: {
        fontSize: 20
      }
    }
  },
  palette: {
    primary: teal,
    secondary: {
      main: '#f44336',
    },
  },
});

const images = [
  {
    title: 'Rezerviraj termin',
    width: '100%',
  },
];

function Home(props) {
  const { classes } = props;
  const MyLink = props => <Link to="/services" {...props} />
  const bingMap = (
    <div style={{ marginTop: 20, marginBottom: 80 }}>
      <iframe style={{ display: 'block', margin: "0 auto", maxWidth: "800px", width: "100%" }} height="400" frameBorder="0" src="https://www.bing.com/maps/embed?h=400&w=800&cp=45.561164181725374~18.66271753440057&lvl=13&typ=d&sty=r&src=SHELL&FORM=MBEDV8" scrolling="no">    </iframe>
      <div style={{ whiteSpace: "nowrap", textAlign: "center", padding: "6px 0" }}>
        <a id="largeMapLink" target="_blank" href="https://www.bing.com/maps?cp=45.561164181725374~18.66271753440057&amp;sty=r&amp;lvl=13&amp;FORM=MBEDLD">View Larger Map</a> &nbsp; | &nbsp;
        <a id="dirMapLink" target="_blank" href="https://www.bing.com/maps/directions?cp=45.561164181725374~18.66271753440057&amp;sty=r&amp;lvl=13&amp;rtp=~pos.45.561164181725374_18.66271753440057____&amp;FORM=MBEDLD">Get Directions</a>
      </div>
    </div>);

  return (
    <MuiThemeProvider theme={theme} >
      <div className={classes.root}>
        {images.map(image => (
          <ButtonBase
            focusRipple
            key={image.title}
            className={classes.image}
            component={MyLink}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: 'url("/static/images/bbs.jpg")',
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="h1"
                variant="h1"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        ))}
      </div>
      <div id="About">
        <div style={{ marginTop: 30, borderTop: "2px solid #aaa" }}></div>
        <Typography
          component="h3"
          variant="h3"
          color="inherit"
          style={{ textAlign: "center", marginTop: 20 }}
        >
          HairDo Barber Shop
        </Typography>
        <Typography
          component="h4"
          variant="h4"
          color="inherit"
          style={{ textAlign: "center", marginTop: 20 }}
        >
          <i className="material-icons">location_on</i> Ulica Ljudevita Posavskog 2a, 31000 Osijek, Croatia
        </Typography>
        <Typography
          component="h4"
          variant="h4"
          color="inherit"
          style={{ textAlign: "center", marginTop: 20 }}
        >
          <i className="material-icons">email</i> hairdobarbershop@gmail.com
        </Typography>
        <Typography
          component="h4"
          variant="h4"
          color="inherit"
          style={{ textAlign: "center", marginTop: 20 }}
        >
          <i className="material-icons">call</i> +385 99 548 3977
        </Typography>
        <div style={{ marginTop: 30, borderTop: "2px solid #aaa" }}></div>
        <Typography
          component="h3"
          variant="h3"
          color="inherit"
          style={{ textAlign: "center", marginTop: 20 }}
        >
          Radno vrijeme
        </Typography>

        <Typography
          component="h4"
          variant="h4"
          color="inherit"
          style={{ textAlign: "center", marginTop: 20 }}
        >
          Pon - Ned
        </Typography>

        <Typography
          component="h4"
          variant="h4"
          color="inherit"
          style={{ textAlign: "center", marginTop: 20 }}
        >
          08:00 - 17:00
        </Typography>
        <div style={{ marginTop: 30, borderTop: "2px solid #aaa" }}></div>
        {bingMap}
      </div>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(Home);