import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
    paddingVertical: 4,
  },
  col: {
    width: "16%",
    paddingRight: 5,
  },
  header: {
    fontWeight: "bold",
  },
});
const ExportarPDF = ({ data, titulo, columns }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{titulo}</Text>
      <View style={[styles.row, styles.header]}>
        {columns.map((col, index) => (
          <Text style={styles.col} key={index}>
            {col.headerName}
          </Text>
        ))}
      </View>
      {data.map((row) => (
        <View style={styles.row} key={row.id}>
          {columns.map((col, index) => (
            <Text style={styles.col} key={index}>
              {row[col.field]}
            </Text>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

export default ExportarPDF;
