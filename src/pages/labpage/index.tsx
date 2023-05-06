import React, { useMemo, useState, useEffect } from "react";
import { Box, Typography, Grid, TextField, Button, IconButton, Avatar, Tooltip} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { LocationState, RichLabInfoType, RichLabInfoTemplate, ReviewsType, parsedNameInt, commentsInt} from 'types/interface';
import Rating from '@mui/material/Rating';
import ComPopper from 'components/comPopper';
import { UserData } from "types/interface";
import CancelIcon from '@mui/icons-material/Cancel';
import { useNotifs } from "context";
function getRandomColor(): string { 
    const colors = ['red','#90731E', '#0277BD', 'pink', 'green', 'orange', 'purple', '#F29902', 'brown', 'gray', 'teal'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}


const labpage = (props: {userData: UserData | undefined | null}) =>{ 
    const location = useLocation();
    const notifs = useNotifs();
    const [waiting, setWaiting] = useState<boolean>(false);
    const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
    // get ID from previous url
    const ID = useMemo(() => {
        const { state } = location as LocationState || { state: {pathname: "1" } };
        return state.pathname;
    }, [location]);
    const [labinfo, setLabinfo] = useState<RichLabInfoType>(RichLabInfoTemplate);
    const [comments, setComments] = useState<commentsInt[]>([]);
    // return Initial along with full name
    function parseName(strIN: string): parsedNameInt[] {
        const strList = strIN.split(',');
        let ret: parsedNameInt[] = [];
        for (let i = 0; i < strList.length; i++) {
            let nameSep = strList[i].trim().split(' ');
            // console.log(nameSep);
            let initial = nameSep.length == 1 ? String(nameSep[0][0]) : String(nameSep[0][0] + nameSep[1][0]);
            ret.push({ name: strList[i], initial: initial });
        }
        return ret;
      }

    // fetch content through api
    useEffect(() => {
        fetch(`http://localhost:8000/getLabInfo/${ID}`)
            .then(response => response.json())
            .then(data =>  setLabinfo(data));
    }, []);

    // fetch comments
    useEffect(() => {
     
            fetch(`http://localhost:8000/getComments/${ID}`)
                .then(response => response.json())
                .then(data => setComments(data));
        
    }, [deleteClicked]);

    function handleDelete() { 
        setWaiting(true);
        fetch(`http://localhost:8000/deleteComments/${ID}`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            if (res.ok) {
              notifs.addNotif({ severity: 'success', message: 'Comments deleted successfully!' });
            } else { 
              res.json().then(data =>
                notifs.addNotif({
                  severity: 'error',
                  message: `Delete error: ${data.error}`,
                }),
              );
            }
            setWaiting(false);
            setDeleteClicked(!deleteClicked);
        })
        .catch(console.warn);
    
    };
    return (<Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="400px"
        gap="20px"
        width="100vw"
        
    >
        <Box padding={2}
            sx={{
                gridColumn: 'span 8',
                gridRow: 'span 2',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
                borderTop: '1px solid blue',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '-5px', // add this line to set the distance of the stroke from the top
                    left: '20',
                    width: '50%', // change this value to adjust the length of the stroke
                    height: '10px',
                    backgroundColor: '#00274c',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    borderBottom: '1px solid #00274c',
                }}
            />
            { /* Real content begin */}
            <Typography variant="h5">{labinfo.name}</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', mt: '10px'}}>
                {parseName(labinfo.people).map((item) => (
                    <Tooltip title={ item.name }>
                    <Avatar sx={{ bgcolor: getRandomColor(), mr: '5px', width: 40, height: 40}}>{ item.initial }</Avatar>
                    </Tooltip>
                ))}
            </Box>

            <Typography sx={{ mt: '10px' }}>{ labinfo.intro }</Typography>
        </Box>
        <Box
            padding={2}
            sx={{
                gridColumn: 'span 4',
                gridRow: 'span 2',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                overflow: 'auto',
                borderRadius: '10px',
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
                position: 'relative'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '-5px', // add this line to set the distance of the stroke from the top
                    left: '20',
                    width: '50%', // change this value to adjust the length of the stroke
                    height: '10px',
                    backgroundColor: '#FFCB02',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    borderBottom: '1px solid #FFCB02',
                }}
            />
            { /* Real content begin */}
            <Typography variant="h6">Reviews</Typography>
                {comments.map((item) => (
                    <Box
                    padding={2}
                    sx={{
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        overflow: 'auto',
                        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.5)',
                        position: 'relative',
                        marginTop: '10px'
                    }}
                    >  <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <Typography sx={{ mr: 2 }}>{item.name}</Typography>
                        <Rating
                            name="simple-controlled"
                            value={item.rating}
                            />
                        {   (props.userData?.username == item.name) &&
                                <IconButton
                                    disabled={waiting}
                                    onClick={ handleDelete}
                                    sx={{ color: 'red', ml: '5px', size: 'small' }}>
                                    <CancelIcon />
                                </IconButton>
                        }
                        </Box>
                        <Typography>{item.word}</Typography>
                        </Box>
                    
                ))}
            <Box sx={{
                    position: "absolute",
                    bottom: 10,
                    width: "90%",
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                <ComPopper
                    userData={props.userData}
                    labid={ID}
                    deleteClicked={ deleteClicked}
                    setDeleteClicked={setDeleteClicked} />
            </Box>
        </Box>

       
    </Box>
);
};

export default labpage;