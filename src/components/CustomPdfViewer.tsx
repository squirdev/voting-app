// import { Worker } from '@react-pdf-viewer/core';
// import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
// import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
// import '@react-pdf-viewer/search/lib/styles/index.css';

// import { searchPlugin } from '@react-pdf-viewer/search';


// export default function PdfViewer(url: any) {
//     return (
//         <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">

//             <div
//                 style={{
//                     border: '1px solid rgba(0, 0, 0, 0.3)',
//                     width: '100%',
//                     height: '100%',
//                 }}
//             >
//                 <Viewer fileUrl={url} defaultScale={SpecialZoomLevel.PageFit} />
//             </div>
//         </Worker>
//     )
// }

import * as React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { searchPlugin } from '@react-pdf-viewer/search';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';

interface ShowSearchPopoverButtonExampleProps {
    url: string;
}

const PdfViewer: React.FC<ShowSearchPopoverButtonExampleProps> = ({ url }) => {
    const searchPluginInstance = searchPlugin({
        keyword: 'PDF',
    });
    const { ShowSearchPopoverButton } = searchPluginInstance;
    const thumbnailPluginInstance = thumbnailPlugin();
    const { Thumbnails } = thumbnailPluginInstance;
    return (
        <div style={{ height: '100%' }}>
            <div style={{
                alignItems: 'center',
                backgroundColor: '#eeeeee',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                display: 'flex',
                padding: '4px',
            }}>
                <ShowSearchPopoverButton />
            </div>
            <div
                className="rpv-core__viewer"
                style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100%',
                }}
            >
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <div
                        style={{
                            borderRight: '1px solid rgba(0, 0, 0, 0.3)',
                            overflow: 'auto',
                            width: '30%',
                        }}
                    >
                        <Thumbnails />
                    </div>
                    <div
                        style={{
                            flex: 1,
                        }}
                    >
                        <Viewer fileUrl={"./sample.pdf"} plugins={[searchPluginInstance, thumbnailPluginInstance]} />
                    </div>
                </Worker>
            </div>
        </div>

    );
};

export default PdfViewer;