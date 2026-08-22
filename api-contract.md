# SmartCare registration API contract

The frontend is ready to switch from demo mode to a real API through
`src/config.ts`.

## Endpoint

POST `/api/registrations`

Suggested production behavior:

- Authenticate the request where appropriate.
- Validate the payload server-side.
- Never trust browser-side validation.
- Store uploaded documents in controlled private storage.
- Encrypt data in transit and at rest.
- Apply least-privilege access controls.
- Maintain audit logs.
- Return a non-sensitive registration reference.

## Example response

```json
{
  "reference": "SC-7F3K9P2M",
  "status": "received"
}
```

The current frontend defaults to `demoMode: true` so it does not transmit
real patient information accidentally.
