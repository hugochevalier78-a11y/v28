function safeJson(data){ try { return JSON.stringify(data); } catch(_) { return '{"error":"Erreur JSON"}'; } }

exports.handler = async () => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  };

  return {
    statusCode: 200,
    headers,
    body: safeJson({
      starterPaymentLink: process.env.STRIPE_PAYMENT_LINK_STARTER || '',
      proPaymentLink: process.env.STRIPE_PAYMENT_LINK_PRO || '',
      portalLink: process.env.STRIPE_CUSTOMER_PORTAL_LINK || '',
      supportEmail: process.env.SUPPORT_EMAIL || 'contact@vestiairepro.fr'
    })
  };
};
