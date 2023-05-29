export type admins = "id" | "name" | "username" | "email" | "password" | "image" | "phone" | "address" | "admin_access" | "last_login" | "status" | "remember_token" | "created_at" | "updated_at";
export type configures = "id" | "site_title" | "base_color" | "time_zone" | "base_currency_rate" | "currency" | "currency_symbol" | "theme" | "fraction_number" | "paginate" | "email_verification" | "email_notification" | "sms_verification" | "sms_notification" | "sender_email" | "sender_email_name" | "email_description" | "email_configuration" | "push_notification" | "created_at" | "updated_at" | "error_log" | "strong_password" | "registration" | "address_verification" | "identity_verification" | "maintenance" | "maintenance_message" | "is_active_cron_notification" | "tawk_id" | "tawk_status" | "fb_messenger_status" | "fb_app_id" | "fb_page_id" | "reCaptcha_status_login" | "reCaptcha_status_registration" | "MEASUREMENT_ID" | "analytic_status" | "payment_notice" | "fiat_currency_api" | "fiat_currency_status" | "crypto_currency_api" | "crypto_currency_status";
export type contents = "id" | "name" | "created_at" | "updated_at";
export type content_details = "id" | "content_id" | "language_id" | "description" | "created_at" | "updated_at";
export type content_media = "id" | "content_id" | "description" | "created_at" | "updated_at";
export type currencies = "id" | "name" | "code" | "symbol" | "buy_rate" | "sell_rate" | "min_sell" | "max_sell" | "commission_rate" | "commission_type" | "reserve" | "image" | "flag" | "status" | "sell_status" | "buy_status" | "form_field" | "receiver_form" | "note" | "created_at" | "updated_at";
export type currency_sells = "id" | "user_id" | "send_currency_id" | "receive_currency_id" | "send_amount" | "receive_amount" | "rate" | "sender_info" | "receiver_info" | "exchange_id" | "uuid" | "process_step" | "gateway" | "status" | "comments" | "created_at" | "updated_at";
export type email_templates = "id" | "language_id" | "template_key" | "email_from" | "name" | "subject" | "template" | "sms_body" | "short_keys" | "mail_status" | "sms_status" | "lang_code" | "created_at" | "updated_at";
export type failed_jobs = "id" | "connection" | "queue" | "payload" | "exception" | "failed_at";
export type jobs = "id" | "queue" | "payload" | "attempts" | "reserved_at" | "available_at" | "created_at";
export type languages = "id" | "name" | "short_name" | "flag" | "is_active" | "rtl" | "created_at" | "updated_at";
export type migrations = "id" | "migration" | "batch";
export type notify_templates = "id" | "language_id" | "name" | "template_key" | "body" | "short_keys" | "status" | "notify_for" | "lang_code" | "created_at" | "updated_at";
export type password_resets = "email" | "token" | "created_at";
export type payout_logs = "id" | "user_id" | "method_id" | "amount" | "charge" | "net_amount" | "information" | "feedback" | "trx_id" | "status" | "created_at" | "updated_at";
export type payout_methods = "id" | "name" | "image" | "minimum_amount" | "maximum_amount" | "fixed_charge" | "percent_charge" | "status" | "input_form" | "duration" | "created_at" | "updated_at";
export type referrals = "id" | "commission_type" | "level" | "percent" | "created_at" | "updated_at";
export type referral_bonuses = "id" | "from_user_id" | "to_user_id" | "level" | "amount" | "main_balance" | "transaction" | "type" | "remarks" | "created_at" | "updated_at";
export type site_notifications = "id" | "site_notificational_id" | "site_notificational_type" | "description" | "created_at" | "updated_at";
export type sms_controls = "id" | "actionMethod" | "actionUrl" | "headerData" | "paramData" | "formData" | "created_at" | "updated_at";
export type subscribers = "id" | "email" | "created_at" | "updated_at";
export type templates = "id" | "language_id" | "section_name" | "description" | "created_at" | "updated_at";
export type template_media = "id" | "section_name" | "description" | "created_at" | "updated_at";
export type testimonials = "id" | "user_id" | "currency_sell_id" | "comments" | "rate" | "status" | "created_at" | "updated_at";
export type tickets = "id" | "user_id" | "name" | "email" | "ticket" | "subject" | "status" | "last_reply" | "created_at" | "updated_at";
export type ticket_attachments = "id" | "ticket_message_id" | "image" | "created_at" | "updated_at";
export type ticket_messages = "id" | "ticket_id" | "admin_id" | "message" | "created_at" | "updated_at";
export type transactions = "id" | "user_id" | "amount" | "charge" | "final_balance" | "trx_type" | "remarks" | "trx_id" | "created_at" | "updated_at";
export type users = "id" | "firstname" | "lastname" | "username" | "referral_id" | "language_id" | "email" | "country_code" | "phone_code" | "phone" | "balance" | "image" | "address" | "provider" | "provider_id" | "status" | "identity_verify" | "address_verify" | "two_fa" | "two_fa_verify" | "two_fa_code" | "email_verification" | "sms_verification" | "verify_code" | "sent_at" | "last_login" | "password" | "email_verified_at" | "remember_token" | "created_at" | "updated_at" | "USER" | "CURRENT_CONNECTIONS" | "TOTAL_CONNECTIONS";
//# sourceMappingURL=select.d.ts.map