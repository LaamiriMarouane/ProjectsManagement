import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { SketchPicker } from "react-color";

const ColorPickerModalComponent = ({ setOpen, open, setEventColor, color }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (color) => {
    setEventColor(color.hex);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent sx={{ width: "100%" }}>
        <SketchPicker onChangeComplete={handleChange} color={color} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>cancel</Button>
        <Button onClick={handleClose} autoFocus variant="contained">
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ColorPickerModalComponent;
