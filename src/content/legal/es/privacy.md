---
updated: "2026-11-17"
---

Esta política explica qué datos guarda Intenli Money, para qué los usamos, con quién se comparten y cómo puedes acceder a ellos, corregirlos o eliminarlos. Está escrita para que se entienda: si algo no queda claro, escríbenos a [support@intenli.com](mailto:support@intenli.com).

En resumen: guardamos lo que necesitas para usar la app (tu cuenta y lo que registras en ella). No mostramos anuncios, no usamos herramientas de analítica ni de rastreo, y no vendemos ni alquilamos tus datos. Puedes eliminar tu cuenta cuando quieras.

## 1. Quién es responsable de tus datos

El responsable del tratamiento de tus datos personales es **Santiago Quirumbay Pozo**, persona natural con domicilio en Ecuador, quien desarrolla y opera Intenli Money ("nosotros").

Contacto para cualquier tema de privacidad: [support@intenli.com](mailto:support@intenli.com).

Esta política se rige por la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP) y su reglamento.

## 2. Qué datos guardamos

### Datos que nos das al crear y usar tu cuenta

| Dato | De dónde viene | Para qué |
| --- | --- | --- |
| Correo electrónico | Registro o inicio de sesión con Google | Identificar tu cuenta, iniciar sesión, invitaciones a espacios y correos sobre tu cuenta |
| Nombre | Registro o tu cuenta de Google | Mostrarlo en la app y a los miembros de tus espacios compartidos |
| Contraseña | Registro con correo | Iniciar sesión. Solo guardamos un resumen cifrado (hash Argon2id), nunca la contraseña |
| Identificador de tu cuenta de Google | Inicio de sesión con Google | Vincular tu inicio de sesión de Google con tu cuenta |
| Idioma | Tu teléfono o la app | Mostrar la app y los correos en español o inglés |

### Datos financieros que registras

Todo lo que anotas en la app: espacios, cuentas, saldos iniciales, movimientos (gastos, ingresos, transferencias, ajustes), categorías, deudas con sus pagos y aumentos, cajas (presupuestos y ahorros), tipos de cambio y contactos.

Los **contactos** son los nombres y notas que escribes para tus deudas (por ejemplo, "Juan, vecino"). Son datos de otras personas que tú decides registrar: anota solo lo necesario.

Estos datos los usamos solo para darte el servicio: guardarlos, calcular tus saldos y totales, y mostrártelos a ti y a los miembros de los espacios que compartes.

### Espacios compartidos

Cuando invitas a alguien a un espacio, guardamos su correo y el rol que le das hasta que acepta o la invitación vence. Los miembros de un espacio ven el nombre y el correo de los demás miembros y todo lo que se registra en ese espacio.

### Datos técnicos

- **Sesiones**: cuando inicias sesión creamos un token de sesión. En el servidor solo guardamos un resumen (hash SHA-256); vence a los 30 días o cuando cierras sesión.
- **Registros del servidor**: para mantener el servicio funcionando registramos cada solicitud a la API con su método, ruta, resultado y duración. **No** registramos tu dirección IP ni el contenido de tus datos financieros. La dirección IP se usa solo en memoria, por unos minutos, para limitar intentos repetidos de inicio de sesión.
- **Solicitudes de eliminación de cuenta**: si pides eliminar tu cuenta desde la web, guardamos un resumen del enlace que te enviamos, cuándo vence (30 minutos) y si se usó.

### Datos que se guardan en tu teléfono

La app guarda tu sesión en el almacenamiento seguro del sistema (Keychain en iPhone, Keystore en Android) y una copia de tus datos y de los cambios que aún no se sincronizaron, para que funcione sin conexión. Se borran cuando cierras sesión o eliminas tu cuenta desde la app.

### Lo que no hacemos

- No mostramos publicidad.
- No usamos herramientas de analítica, rastreo ni perfiles publicitarios, ni en la app ni en este sitio web.
- No vendemos, alquilamos ni cedemos tus datos.
- No tomamos decisiones automatizadas que te afecten legalmente.
- Este sitio web no usa cookies.

## 3. Bases legales

Tratamos tus datos porque son necesarios para **cumplir el contrato** que aceptas al crear tu cuenta (los [Términos y condiciones](/money/terms)): sin tu correo, tu contraseña o lo que registras, la app no puede funcionar.

Los registros técnicos y los límites de intentos se basan en nuestro **interés legítimo** en mantener el servicio seguro y disponible. Si la ley nos obliga a conservar o entregar algún dato, lo haremos en cumplimiento de una **obligación legal**.

## 4. Con quién se comparten

Solo con los proveedores que necesitamos para operar el servicio, que tratan los datos por encargo nuestro y bajo sus propias obligaciones de seguridad y confidencialidad:

| Proveedor | Para qué | Dónde |
| --- | --- | --- |
| Railway | Servidores de la API y base de datos donde se guarda tu cuenta y tus datos financieros | Estados Unidos |
| Resend | Envío de correos sobre tu cuenta (por ejemplo, el enlace para eliminarla) | Estados Unidos |
| Vercel | Alojamiento de este sitio web | Red global |
| Google | Inicio de sesión con Google, solo si lo usas. Google nos envía tu nombre, correo e identificador de cuenta | Google se rige por su propia política de privacidad |

También pueden ver tus datos los **miembros de tus espacios compartidos**, según el rol que tengan.

No compartimos datos con nadie más, salvo que una autoridad competente lo exija conforme a la ley.

## 5. Transferencias internacionales

Nuestros servidores están en **Estados Unidos**, así que tus datos se transfieren fuera del Ecuador. Elegimos proveedores que aplican medidas de seguridad reconocidas (cifrado en tránsito, controles de acceso) y que se comprometen contractualmente a proteger los datos. Al usar Intenli Money, tus datos se tratan en esos servidores con las garantías descritas en esta política.

## 6. Cuánto tiempo los guardamos

- **Tu cuenta y tus datos financieros**: mientras tengas la cuenta. Cuando la eliminas, se borran de inmediato de la base de datos (ver la sección 8).
- **Sesiones**: hasta 30 días, o hasta que cierres sesión.
- **Enlaces de eliminación**: vencen a los 30 minutos y se borran con tu cuenta.
- **Copias de seguridad** de la base de datos: se sobrescriben solas en un máximo de **30 días**.
- **Registros del servidor**: el tiempo limitado que los guarda nuestro proveedor de alojamiento, sin IP ni datos financieros.
- **Invitaciones**: hasta que se aceptan, se revocan o vencen (7 días).

## 7. Cómo protegemos tus datos

- Todo el tráfico entre la app y el servidor va cifrado (HTTPS).
- Las contraseñas se guardan con Argon2id y las sesiones y enlaces solo como resúmenes SHA-256.
- Cada espacio tiene roles (propietario, editor, lector) y solo sus miembros pueden ver sus datos.
- En tu teléfono, la sesión se guarda en el almacenamiento seguro del sistema.

Ningún sistema es 100 % seguro. Si ocurre una vulneración que afecte tus datos, te avisaremos y notificaremos a la autoridad como exige la ley.

## 8. Tus derechos

Según la LOPDP tienes derecho a:

- **Acceder** a tus datos y saber cómo los tratamos.
- **Rectificarlos o actualizarlos**: puedes cambiar tu idioma y todo lo que registras desde la app; para corregir tu nombre o correo, escríbenos.
- **Eliminarlos**: desde la app (**Más → Eliminar cuenta**) o desde [intenli.com/money/delete-account](/money/delete-account).
- **Oponerte** a un tratamiento o pedir que lo **suspendamos**.
- **Portabilidad**: pídenos una copia de tus datos en un formato estructurado (JSON o CSV).
- No ser objeto de **decisiones automatizadas** (no las tomamos).

Para ejercerlos, escríbenos a [support@intenli.com](mailto:support@intenli.com) desde el correo de tu cuenta. Responderemos dentro de los plazos que fija la ley. Si no estás conforme con nuestra respuesta, puedes reclamar ante la **Superintendencia de Protección de Datos Personales** del Ecuador.

### Qué pasa cuando eliminas tu cuenta

- Se borran tu nombre, correo, contraseña, la conexión con Google y todas tus sesiones.
- Se borra tu espacio personal y los espacios donde eres el único miembro, con todos sus datos.
- En los espacios compartidos con otras personas, sales del espacio. Lo que registraste se queda para ellas, sin tu nombre, porque forma parte de sus cuentas.
- Si eras el único propietario de un espacio compartido, otro miembro pasa a ser propietario y le avisamos por correo.
- Te enviamos un correo de confirmación.

## 9. Menores de edad

Intenli Money es para personas de **13 años o más**. Si tienes menos de 18 años, necesitas el permiso de tu madre, padre o representante legal para usarla. Si crees que un menor de 13 años nos dio sus datos, escríbenos y los eliminaremos.

## 10. Cambios a esta política

Si cambiamos esta política, actualizaremos la fecha de arriba. Si el cambio es importante, te avisaremos en la app o por correo antes de que se aplique.

## 11. Contacto

Santiago Quirumbay Pozo · Ecuador · [support@intenli.com](mailto:support@intenli.com)
