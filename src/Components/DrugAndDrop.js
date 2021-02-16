import { FileDrop } from 'react-file-drop';
import React, {useRef} from "react";
export default function DrugAndDrop(){
    const fileInputRef = useRef(null);
    const onFileInputChange = (event) => {
        const { files } = event.target;
        // do something with your files...
    }
    const onTargetClick = () => {
        fileInputRef.current.click()
    }
    return(
        <div>
            <input
                onChange={onFileInputChange}
                ref={fileInputRef}
                type="file"
                className="hidden"
            />
            <FileDrop onTargetClick={onTargetClick} />
        </div>
    )
}