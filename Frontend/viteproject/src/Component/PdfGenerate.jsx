// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4',
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

// const PdfGenerator = ({ orderData }) => {
//   const fileName = 'order_bill.pdf';

//   const generatePdf = () => {
//     // Create a Blob containing the PDF data
//     const blob = new Blob([<PDFViewer width="1000" height="600"><Document>
//       <Page style={styles.page}>
//         <View style={styles.section}>
//           <Text>Order Summary</Text>
//           {/* Add your order details here */}
//           <Text>{JSON.stringify(orderData, null, 2)}</Text>
//         </View>
//       </Page>
//     </Document></PDFViewer>], { type: 'application/pdf' });

//     // Create a download link
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = fileName;

//     // Trigger a click on the link to start the download
//     link.click();
//   };

//   return (
//     <div>
//       <button onClick={generatePdf}>Generate PDF</button>
//     </div>
//   );
// };

// export default PdfGenerator;
