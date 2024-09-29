import { gql, useMutation, useQuery } from "@apollo/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {  startCase, uniq } from "lodash";
import { NewSubmissionsQuery } from "../gql/graphql";
import styled from "@emotion/styled";


const Container = styled.div`
  display : flex,
  height : 100vh,
  flex-direction : column ;
  width : 100vw,
`

const  Toolbar = styled.div`
 background : #eee ;
  display: flex;
  justify-content: flex-end;
  padding : 15px ;
`
const Button = styled.button`
  background : black ;
  border-radius : 15px,
  border: none ;
  color: white ;
  padding: 12px 15px; 
`

const Dashboard: React.FC = () => {
  const { data, loading, error } = useQuery<NewSubmissionsQuery>(gql`
    query NewSubmissions {
      newsubmissions {
        id
        submittedAt
        data
      }
    }
  `);

    const[generateSubmission ] = useMutation(gql`
      mutation GenerateSubmissions($count : Int){
        queueGeneratedSubmission(count: $count)
      }
      `,{variables:{count : 10},
      refetchQueries: [{ query: gql`query NewSubmissions { newsubmissions { id submittedAt data } }` }]
    });



  if (loading) return <div>Loading... </div>;
  if (error) return <div>Error : {error.message}</div>
  const { newsubmissions } = data!;
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "submittedAt", headerName: "Submitted" },
    ...uniq(newsubmissions.flatMap((s: any) => Object.keys(s.data) as string[])).map(
      (field: string) => ({
        field, headerName: startCase(field),
        valueGetter: (params: any, row: any) => {
          if (row) {

            // console.log(row.data[field]);
            return row.data[field];
          } else {
            console.error("row or row.field is undefined", params);
            return null; // or some default value
          }
        },
      })
    ),
  ];
  return (
    <Container>
    <Toolbar>
      <Button onClick={()=> generateSubmission()}>
          Generate Submissions
      </Button>
      </Toolbar>
    <DataGrid
      rows={newsubmissions}
      columns={columns}
      // initialState={{
      //   pagination: {
      //     paginationModel: {
      //       pageSize: 5,
      //     },
      //   },
      // }}
      // pageSizeOptions={[5]}
      disableRowSelectionOnClick
    />
    </Container>
  );
};
export default Dashboard;
