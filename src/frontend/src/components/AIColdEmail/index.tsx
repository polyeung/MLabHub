// External Dependencies
import React, { FC, useEffect, useState, useRef } from "react";
import styled from "styled-components";

// Types
import { useNotifs } from '@/context';

// absolute path
import { slowAppear } from "@/utils/animation";
import { ColdEmailPreviewProps } from "@/types/interface";
import { CloseButtonSVG } from '@/assets';
import { getColdEmailRequest } from "@/utils/axios/apiRequests";

const ShareModelContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    animation: ${slowAppear} 0.3s ease forwards;
`

const ShareContainer = styled.div`
    position: relative;
    background-color: #323338;
    width: 742px;
    height: auto;
    max-height: 100dvh;
    flex-shrink: 0;
    border-radius: 10px;
    padding: 24px;
    animation: ${slowAppear} 0.5s ease forwards;
    overflow-y: hidden;
    @media (max-width: 768px) {
        width: 363px;
    }
`

const Spacer = styled.div<{ height: string }>`
    height: ${(props) => props.height};
`

const CloseButton = styled.button`
    position: absolute;
    right: 12px;
    top: 12px;
`

const CloseIcon = styled.img`
    width: 18px;
    height: 18px;
    flex-shrink: 0;
`

const Title = styled.div`
    display: flex;
    color: #cccccc;
    font-size: 14px;
    font-weight: 700;

    & .highlight {
        color: #00e2d2;
    }
`

const ShareSubTitle = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    color: #98999b;
    font-size: 12px;
    font-weight: 500;
`

const UpgradeButton = styled.button<{}>`
    width: 100%;
    display: flex;
    padding: 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: #4e4df4;
    &:hover {
        opacity: 0.8;
    }
`
const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
`

const HiddenCanvas = styled.canvas`
    visibility: hidden;
    position: absolute;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
`

const UploadButton = styled.button`
    width: 41.955%;
    height: 20%;
    background-color: #01a599;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    color: black;
    @media (max-width: 1279px) {
        font-size: 9px;
    }
`

const ColdEmailPreview: FC<ColdEmailPreviewProps> = ({
    setColdEmailOpen,
    labInfo,
}) => {
    
    const notifs = useNotifs();

    const hiddenFileInput = useRef<HTMLInputElement>(null)
    const [uploadedFile, setUploadedFile] = useState<any | null>(null)
    const [coldEmailContent, setColdEmailContent] = useState<string>('')

    const handleUploadButtonClick = (event: React.MouseEvent) => {
        hiddenFileInput.current?.click()
    }

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            // setOpenPreview(false)
        }
    };

    const handleGetColdEmailRequest = async () => {
        // setImageDetecting(true)
        // addNotification("Uploading Image...", "success", 2000)
        const formData = new FormData()
        formData.append("pdfFile", uploadedFile)
        formData.append("labInfo", labInfo)
        setColdEmailOpen(false)

        // for (let file of uploadedFiles) {
        //     formData.append("imageFiles", file)
        // }
        await getColdEmailRequest
            .post(formData)
            .then((response:any) => {
                if (response.picture_message) {
                    notifs.addNotif({ severity: 'success', message: 'Resume Submitted Successful!' });
                    notifs.addNotif({ severity: 'error', message: 'Something went wrong!' });
                    
                    let content = response.content
                    setColdEmailContent(content)
                    
                } else {
                    notifs.addNotif({ severity: 'error', message: 'Resume Submitted Error!' });
                    
                }
            })
            .catch((error:any) => {
                notifs.addNotif({ severity: 'error', message: error });
                
                // if (error.response.status == 403) {
                //     addNotification("Guest user can not perform this action!", "info", 2000)
                // } else if (error.response.status == 429) {
                //     setTimeout(() => {
                //         addNotification("ratelimited! try again later", "error", 2000)
                //     }, 500)
                // }
            })
            .finally(() => {
                setUploadedFile(null)
                // setUploadedLatexFile(null)
                // setUploadedImage(null)
                // setUploadedFiles([])
                // setImageDetecting(false)
            })
    }

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]

            if (file.size > 20 * 1024 * 1024) {
                event.target.value = "";
                alert('File is too big!');
                return
            }

            if (file.type === "application/pdf") {
                
                setUploadedFile(file);
            } else {
                alert('Please upload a PDF file.'); 
            }
        }
        event.target.value = ""
    }

    return (
        <ShareModelContainer onClick={handleClickOutside}>
            <ShareContainer>
                <CloseButton
                    onClick={() => {
                        setColdEmailOpen(false)
                    }}
                >
                    <CloseIcon src={CloseButtonSVG} alt="" />
                </CloseButton>
                <Title>AI Generated Cold Email</Title>
                <Spacer height="8px" />

                <ShareSubTitle>Upload your resume to get an AI-Generated Cold Email.</ShareSubTitle>
                {/* {uploadedFile &&<Image src={URL.createObjectURL(uploadedFile)} width = {400} height = {300} alt = "uploaded pic"/>} */}
                <input
                    type="file"
                    accept="image/*"
                    ref={hiddenFileInput}
                    onChange={handleUpload}
                    style={{ display: "none" }}
                />
                <UploadButton onClick={ handleUploadButtonClick}>Upload Resume</UploadButton>
                <Spacer height="20px" />
                {coldEmailContent}
                <ButtonContainer>
                    <UpgradeButton >Submit</UpgradeButton>
                    <UpgradeButton
                        onClick={() => {
                            setColdEmailOpen(false)
                        }}
                    >
                        Cancel
                    </UpgradeButton>
                </ButtonContainer>
            </ShareContainer>
        </ShareModelContainer>
    )
}

export default ColdEmailPreview
