import { gql } from "apollo-server-core";

const schema = gql`
    scalar JSON
    scalar DateTime
    type Query {
    newsubmissions :  [Submission!]!
    }

    type Mutation{
     queueGeneratedSubmission(count : Int): Boolean!

    }


    type Submission {
    id: ID!
    submittedAt: DateTime!
    data: JSON!
    }
    `;
export default schema