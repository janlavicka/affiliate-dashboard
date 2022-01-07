/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import dotenv from "dotenv";

dotenv.config({ path: ".env" });

import faker from "faker";
import { createServiceSupabase } from "../../lib/supabase";
import { prisma } from "../../lib/prisma";
import { ConnectionFactory } from "../../lib/factories/connection";
import { CampaignFactory } from "../../lib/factories/campaign";
import { CommissionFactory } from "../../lib/factories/commission";

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on("task", {
    "user:create": async () => {
      const supabase = createServiceSupabase();

      const name = faker.name.firstName();
      const email = faker.internet.email();
      const password = faker.internet.password();

      const { data: user } = await supabase.auth.api.signUpWithEmail(
        email,
        password,
        { data: { name } },
      );

      const connection = await ConnectionFactory.create({
        user_id: user.user.id,
      });

      await CampaignFactory.create({
        connections: {
          connect: {
            id: connection.id,
          },
        },
        commissions: {
          createMany: {
            data: [
              CommissionFactory.build(),
              CommissionFactory.build(),
              CommissionFactory.build(),
              CommissionFactory.build(),
              CommissionFactory.build(),
            ],
          },
        },
      });

      await CampaignFactory.create({
        connections: {
          connect: {
            id: connection.id,
          },
        },
        commissions: {
          createMany: {
            data: [CommissionFactory.build()],
          },
        },
      });

      await CampaignFactory.create({
        connections: {
          connect: {
            id: connection.id,
          },
        },
        commissions: {
          createMany: {
            data: [
              CommissionFactory.build(),
              CommissionFactory.build(),
              CommissionFactory.build(),
            ],
          },
        },
      });

      return { name, email, password, user };
    },
    "user:delete": async (user) => {
      const supabase = createServiceSupabase();

      await supabase.auth.api.deleteUser(
        user.user.id,
        process.env.SUPABASE_SERVICE_KEY,
      );

      await prisma.connections.deleteMany({
        where: {
          user_id: user.user.id,
        },
      });

      return true;
    },
  });
};
