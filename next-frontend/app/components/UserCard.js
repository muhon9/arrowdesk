import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Divider } from "@mui/material";
import Popover from "@mui/material/Popover";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function UserCard({ user }) {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="flex flex-col w-1/5 shadow-lg rounded-md">
      <div className="relative h-[150px] bg-blue-500 flex flex-col justify-center items-center">
        <Avatar
          sx={{
            bgcolor: red[500],
            border: 2,
            width: 56,
            height: 56,
            marginBottom: 2,
          }}
        >
          {user?.name[0].toUpperCase()}
        </Avatar>
        <div className="text-xl font-medium text-white">{user?.name}</div>
        <div className="text-md font-medium text-white">{user?.role}</div>
        <IconButton
          aria-label="settings"
          sx={{ position: "absolute", right: 2, top: 4 }}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="p-2">
            <div className="hover:bg-gray-100 p-2 rounded-md">Edit</div>
            <div className="hover:bg-gray-100 p-2 rounded-md">Delete</div>
          </div>
        </Popover>
      </div>
      <div className="m-5">
        <div>
          <div className="text-lg font-medium">Role</div>
          <div className="text-md font-light">{user?.role}</div>
        </div>
        <Divider sx={{ marginY: 1 }} />
        <div>
          <div className="text-lg font-medium">Phone</div>
          <div className="text-md font-light">017698782</div>
        </div>
      </div>
    </div>
  );
}
