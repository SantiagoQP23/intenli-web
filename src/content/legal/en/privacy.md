---
updated: "2026-11-17"
---

This policy explains what data Intenli Money keeps, what we use it for, who it's shared with, and how you can access, correct or delete it. It's written to be understood: if anything is unclear, write to [support@intenli.com](mailto:support@intenli.com).

In short: we keep what you need to use the app (your account and what you record in it). We show no ads, use no analytics or tracking tools, and don't sell or rent your data. You can delete your account whenever you want.

## 1. Who is responsible for your data

The controller of your personal data is **Santiago Quirumbay Pozo**, an individual based in Ecuador, who builds and runs Intenli Money ("we").

Contact for anything about privacy: [support@intenli.com](mailto:support@intenli.com).

This policy is governed by Ecuador's Organic Law on Personal Data Protection (LOPDP) and its regulations.

## 2. What data we keep

### Data you give us when you create and use your account

| Data | Where it comes from | What for |
| --- | --- | --- |
| Email address | Sign-up or Google sign-in | Identify your account, sign in, space invitations and emails about your account |
| Name | Sign-up or your Google account | Show it in the app and to the members of your shared spaces |
| Password | Email sign-up | Sign in. We only keep an encrypted digest (Argon2id hash), never the password |
| Your Google account ID | Google sign-in | Link your Google sign-in to your account |
| Language | Your phone or the app | Show the app and emails in English or Spanish |

### Financial data you record

Everything you enter in the app: spaces, accounts, opening balances, transactions (expenses, income, transfers, adjustments), categories, debts with their payments and increases, boxes (budgets and savings), exchange rates and contacts.

**Contacts** are the names and notes you write for your debts (for example, "John, neighbor"). They're data about other people that you choose to record: only write what you need.

We use this data only to provide the service: store it, calculate your balances and totals, and show it to you and to the members of the spaces you share.

### Shared spaces

When you invite someone to a space, we keep their email and the role you give them until they accept or the invitation expires. Members of a space see the other members' names and emails and everything recorded in that space.

### Technical data

- **Sessions**: when you sign in we create a session token. The server keeps only a digest (SHA-256 hash); it expires after 30 days or when you sign out.
- **Server logs**: to keep the service running we log each API request's method, path, result and duration. We do **not** log your IP address or the content of your financial data. Your IP address is used only in memory, for a few minutes, to limit repeated sign-in attempts.
- **Account deletion requests**: if you ask to delete your account from the website, we keep a digest of the link we email you, when it expires (30 minutes) and whether it was used.

### Data kept on your phone

The app keeps your session in the system's secure storage (Keychain on iPhone, Keystore on Android) and a copy of your data and of changes not yet synced, so it works offline. They're erased when you sign out or delete your account from the app.

### What we don't do

- We don't show ads.
- We don't use analytics, tracking or advertising profiles, in the app or on this website.
- We don't sell, rent or hand over your data.
- We don't make automated decisions that legally affect you.
- This website doesn't use cookies.

## 3. Legal bases

We process your data because it's necessary to **perform the contract** you accept when you create your account (the [Terms and Conditions](/en/money/terms)): without your email, password or what you record, the app can't work.

Technical logs and attempt limits rest on our **legitimate interest** in keeping the service secure and available. If the law requires us to keep or hand over any data, we'll do so to comply with a **legal obligation**.

## 4. Who it's shared with

Only with the providers we need to run the service, which process data on our behalf and under their own security and confidentiality obligations:

| Provider | What for | Where |
| --- | --- | --- |
| Railway | Servers for the API and the database that holds your account and financial data | United States |
| Resend | Sending emails about your account (for example, the link to delete it) | United States |
| Vercel | Hosting this website | Global network |
| Google | Google sign-in, only if you use it. Google sends us your name, email and account ID | Google is governed by its own privacy policy |

The **members of your shared spaces** can also see your data, according to their role.

We don't share data with anyone else, unless a competent authority requires it under the law.

## 5. International transfers

Our servers are in the **United States**, so your data is transferred outside Ecuador. We choose providers that apply recognized security measures (encryption in transit, access controls) and that commit contractually to protecting data. When you use Intenli Money, your data is processed on those servers with the safeguards described in this policy.

## 6. How long we keep it

- **Your account and financial data**: as long as you have the account. When you delete it, it's erased from the database right away (see section 8).
- **Sessions**: up to 30 days, or until you sign out.
- **Deletion links**: expire after 30 minutes and are erased with your account.
- **Database backups**: overwritten on their own within **30 days**.
- **Server logs**: the limited time our hosting provider keeps them, without IP addresses or financial data.
- **Invitations**: until accepted, revoked or expired (7 days).

## 7. How we protect your data

- All traffic between the app and the server is encrypted (HTTPS).
- Passwords are stored with Argon2id, and sessions and links only as SHA-256 digests.
- Each space has roles (owner, editor, viewer) and only its members can see its data.
- On your phone, the session is kept in the system's secure storage.

No system is 100% secure. If a breach affects your data, we'll tell you and notify the authority as the law requires.

## 8. Your rights

Under the LOPDP you have the right to:

- **Access** your data and know how we process it.
- **Rectify or update** it: you can change your language and everything you record from the app; to correct your name or email, write to us.
- **Delete** it: from the app (**More → Delete account**) or from [intenli.com/en/money/delete-account](/en/money/delete-account).
- **Object** to processing or ask us to **suspend** it.
- **Portability**: ask us for a copy of your data in a structured format (JSON or CSV).
- Not be subject to **automated decisions** (we don't make any).

To use them, write to [support@intenli.com](mailto:support@intenli.com) from your account's email. We'll answer within the time limits the law sets. If you're not satisfied with our answer, you can complain to Ecuador's **Superintendency of Personal Data Protection** (Superintendencia de Protección de Datos Personales).

### What happens when you delete your account

- Your name, email, password, Google connection and all your sessions are erased.
- Your personal space and the spaces where you're the only member are erased, with all their data.
- In spaces shared with other people, you leave the space. What you recorded stays for them, without your name, because it's part of their accounts.
- If you were the only owner of a shared space, another member becomes its owner and we let them know by email.
- We send you a confirmation email.

## 9. Children

Intenli Money is for people **13 or older**. If you're under 18, you need permission from your parent or legal guardian to use it. If you believe a child under 13 gave us their data, write to us and we'll delete it.

## 10. Changes to this policy

If we change this policy, we'll update the date at the top. If the change is significant, we'll let you know in the app or by email before it applies.

## 11. Contact

Santiago Quirumbay Pozo · Ecuador · [support@intenli.com](mailto:support@intenli.com)
