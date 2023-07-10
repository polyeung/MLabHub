import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ExpandableText({ dialogTitle, text, maxLines }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current && textRef.current.scrollHeight > textRef.current.clientHeight) {
      setIsExpanded(false);
    }
  }, [text]);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };
    
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent overriding of onClick in parent components
    toggleText();
  };

  const getTextStyle = () => {
    if (textRef.current) {
        // when the text is kept shortened
        return {
            maxHeight: maxLines * parseFloat(getComputedStyle(textRef.current).lineHeight),
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        };
    } else {
        // when the text is expanded
        return {};
    }
  };

    return (
        <Box>
            <Typography ref={textRef} style={getTextStyle()} variant="body2" color="text.secondary">
                {text}
            </Typography>
            {(textRef.current && textRef.current.scrollHeight > textRef.current.clientHeight) && 
            <div onClick={handleButtonClick}>
                <Button size="small" color="primary">
                    {isExpanded ? 'Expanded' : 'Expand'}
                </Button>
                <Dialog open={isExpanded} onClose={toggleText}>
                    <DialogTitle>
                        {dialogTitle}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={toggleText}>Close</Button>
                        {/* link to the website (external)
                        link to the lab info page (internal) */}
                    </DialogActions>
                </Dialog>
            </div>
            } 
        </Box>
  );
}

export default ExpandableText;