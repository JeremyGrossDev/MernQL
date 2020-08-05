const { gql } = require("apollo-server-express");

const me = () => "Bob";

module.exports = {
  Query: {
    me,
  },
};
