export const PLAN_ENTITLEMENTS = {
  Starter: {
    products: {
      webwhale: true,
      sqlwhale: {
        access: "free",
      },
    },
    services: {
      webDevelopment: false,
      marketing: false,
      prioritySupport: false,
    },
    learning: {
      premium: false,
    },
  },

  Growth: {
    products: {
      webwhale: true,
      sqlwhale: {
        access: "premium",
      },
    },
    services: {
      webDevelopment: true,
      marketing: true,
      prioritySupport: true,
    },
    learning: {
      premium: true,
    },
  },

  Business: {
    products: {
      webwhale: true,
      sqlwhale: {
        access: "premium",
      },
    },
    services: {
      webDevelopment: true,
      marketing: true,
      prioritySupport: true,
    },
    learning: {
      premium: true,
    },
  },
};

export function getPlanEntitlements(plan = "Starter") {
  return PLAN_ENTITLEMENTS[plan] || PLAN_ENTITLEMENTS.Starter;
}

export function hasEntitlement(plan, path) {
  const entitlements = getPlanEntitlements(plan);

  return path.split(".").reduce((value, key) => value?.[key], entitlements) === true ||
    path.split(".").reduce((value, key) => value?.[key], entitlements) === "premium";
}
