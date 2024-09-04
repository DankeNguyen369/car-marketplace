/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://danke_dev:GZdqKnIB0N5X@ep-wispy-shape-a13rpntm-pooler.ap-southeast-1.aws.neon.tech/car-marketplace?sslmode=require",
  },
};
