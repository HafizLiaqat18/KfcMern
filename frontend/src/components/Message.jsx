import React, { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { alertMesg } from '../../atom';
function Message() {
    const mesgRef = useRef();
    const [mesg,setMesg] = useAtom(alertMesg);

    useEffect(() => {
        if (mesg.message) {
           
            mesgRef.current.style.display = 'flex';

            const timer = setTimeout(() => {
                mesgRef.current.style.display = 'none';
                setMesg("");
            }, 1500);

         
            return () => clearTimeout(timer);
        } else {
          
            mesgRef.current.style.display = 'none';
        }
    }, [mesg]); 

    return (
        <div ref={mesgRef} className='absolute top-0 justify-center w-full bg-transparent '>
            <h1 className={`text-center ${mesg.success?"bg-green-500":"bg-red-500"} w-auto p-3 rounded-lg`}>{mesg.message}</h1>
        </div>
    );
}

export default Message;
