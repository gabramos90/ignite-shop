import { NextApiRequest, NextApiResponse } from "next"
import { stripe } from "../../lib/stripe"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { priceId } = req.body;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed.' })
    }

    if (!priceId) {
        return res.status(400).json({ error: 'Price not found.' })
    }

    // o next nao faz divergencia de método http nas rotas api. Enato eu posso chamar as routas com qualquer método que ela vai executar

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_URL}`

    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'payment',
        line_items: [
            {
                price: priceId,
                quantity: 1,
            }
        ]
    })

    return res.status(201).json({
        checkoutUrl: checkoutSession.url,
    })
}
// todos os dados que rodam aqui dentro são server side, ou seja =, aqui eu posso colcoar dados sensíveis
