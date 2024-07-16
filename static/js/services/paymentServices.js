const getInvoiceUrl = (invoice) => {
    if (!invoice) {
        return null;
    }
    let url_prefix = "https://app.fawaterk.com/invoice/";
    url_prefix =
        invoice.invoice_provider == "shakeout" ? "https://dash.shake-out.com/invoice/" : url_prefix;
    return `${url_prefix}${invoice.invoice_id}/${invoice.invoice_key}`;
};

const payment = {
    getInvoiceUrl,
};

export default payment;
