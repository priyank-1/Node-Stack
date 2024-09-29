import {GraphQLDate,GraphQLDateTime} from "graphql-iso-date";
import GraphQLJSON from "graphql-type-json";
// import { Query } from "pg";
import db from "../modules/db";
import { enqueue, myQueue } from "../modules/queue";
// import { tr } from "@faker-js/faker";
import { times } from "lodash";

const resolvers = {
    DateTime : GraphQLDateTime,
    JSON : GraphQLJSON,

    Query:{
        newsubmissions: () =>{
           return db.newSubmission.findMany({
                orderBy : {submittedAt : "desc"}
            })
        },
    },

    Mutation : {
        queueGeneratedSubmission  : async(_ : any,{count }:{count:number}) =>{
        await Promise.all(times(count ?? 1).map(async()=>{
                await enqueue('generateSubmissions' );
            })
        )
         return true;
        }
    }
};

export default resolvers;