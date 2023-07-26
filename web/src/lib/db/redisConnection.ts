import Redis from "ioredis";
import { UPSTASH_REDIS_PASSWORD } from "$env/static/private";

export const client = new Redis(
  `rediss://default:${UPSTASH_REDIS_PASSWORD}@pet-mako-35433.upstash.io:35433`
);
