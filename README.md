# Aruga PhilHealth – AI Coding Context File
# Project: Enterprise Hospital Management System with PhilHealth Integration

---

## PROJECT IDENTITY

**System:** Enterprise Hospital Management System (Aruga)
**Country:** Republic of the Philippines
**Integration:** PhilHealth PHICS API (Philippine Health Insurance Corporation)

---

## TECH STACK — NON-NEGOTIABLE

```
Backend:     Quarkus 3.x, OpenJDK 21, GraalVM native, Gradle
ORM:         Hibernate Reactive + Panache
Database:    PostgreSQL 16
Frontend:    SolidJS, shadcn/ui (CDN), TailwindCSS v4
Migrations:  Liquibase
Containers:  Docker
```

---

## COMMANDS

### Backend (`/backend`)

```bash
./gradlew quarkusDev          # Start dev server with hot reload
./gradlew test                # Run all tests
./gradlew test --tests "com.aruga.{module}.{ClassName}"  # Run single test class
./gradlew test --tests "com.aruga.{module}.{ClassName}.{methodName}"  # Run single test
./gradlew quarkusBuild -Dquarkus.package.type=native  # Native GraalVM build
./gradlew quarkusBuild        # JVM build
```

### Frontend (`/frontend`)

```bash
npm install    # Install dependencies
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # Lint
```

---

## MANDATORY PROJECT STRUCTURE (`/backend`)

Every module MUST follow this exact package structure:

```
src/main/java/com/ehms/
  {module}/
    {Module}HttpAdapter.java       ← @Path @ApplicationScoped; no business logic
    {Module}Service.java           ← @ApplicationScoped @Transactional; all business logic here
    {Module}Repository.java        ← extends PanacheRepository<Entity>
    entity/
      {Entity}.java                ← @Entity @Table; Panache active-record optional
    dto/
      Create{Entity}Request.java   ← record + @Valid + Hibernate Validator
      {Entity}Response.java        ← plain record; never expose @Entity
    exception/
      {Domain}Exception.java       ← extends EhmsBusinessException (@ResponseStatus)
    validator/
      {Rule}Validator.java         ← implements ConstraintValidator<>
  shared/
    audit/AuditAspect.java         ← @Interceptor @AroundInvoke on @Service binding
    audit/AuditLog.java            ← @Entity; insert-only; NEVER update/delete
    security/JwtAuthFilter.java    ← implements ContainerRequestFilter (@Provider)
    exception/GlobalExceptionHandler.java  ← implements ExceptionMapper<T> (@Provider)
    exception/EhmsBusinessException.java   ← Base business exception

src/test/java/com/ehms/
  {module}/
    {Module}ServiceTest.java       ← @QuarkusTest + @InjectMock (Mockito)
    {Module}HttpAdapterTest.java   ← @QuarkusTest + RestAssured
    {Module}RepositoryTest.java    ← @QuarkusTest + @TestTransaction + Testcontainers

src/main/resources/
  application.yml                  ← Base config
  application-dev.yml              ← Local dev overrides
  application-staging.yml
  application-prod.yml             ← quarkus.virtual-threads.enabled=true
  db/migration/
    db.changelog-master.xml        ← Liquibase root changeset
    vX-<description>.sql
```

### Frontend structure (`/frontend`)

```
src/
  routes/         ← File-based routing via @solidjs/router
  components/ui/  ← shadcn components (CDN-sourced)
  lib/api.ts      ← ALL API calls go through here; never use fetch() directly
```

---

## SECURITY & RBAC

**15 RBAC Roles (stored in USER_ROLE table):**
```
REGISTRATION_STAFF, CLAIMS_PREPARER, CLAIMS_APPROVER, BILLING_OFFICER,
PHYSICIAN, NURSE, PHARMACIST, LAB_TECHNOLOGIST, INVENTORY_OFFICER,
HR_OFFICER, REPORT_VIEWER, SYSTEM_ADMIN, INTERNAL_AUDITOR,
CLINICAL_INFORMATICS, SUPER_ADMIN
```

- JWT access token: 15 minutes expiry
- Use `@RolesAllowed` on every `@HttpAdapter` method that is security-sensitive

---

## CODING STANDARDS — ALWAYS FOLLOW

### Backend (Java)
1. **Google Java Style Guide** — 2-space indentation, no wildcard imports
2. **Java Records** — prefer records for DTOs; use POJO only when mutation is required
3. **Layer separation** — HttpAdapter → Service → Repository (NEVER skip layers)
4. **@Transactional** — on all Service write methods; `readOnly=true` on reads
5. **DTOs** — NEVER expose `@Entity` in API responses
6. **Hibernate Reactive** — all DB calls must return `Uni<>` or `Multi<>`; use `.onItem().transform()` for sync transforms (not `.map()`); never call `.await().indefinitely()` in production
7. **@NonNull** — on all service method parameters
8. **Optional<T>** — on all repository `findBy` methods that may return empty
9. **BigDecimal** — for ALL monetary amounts (never `double` or `float`)
10. **HQL only** — no raw SQL; use `@Query` with HQL
11. **@Schema** — on all DTO fields (OpenAPI/Swagger)
12. **@Operation** — on all HTTP endpoint methods (Swagger)
13. **Logging** — use `io.quarkus.logging.Log`; no `System.out.println`
14. **Config** — all sensitive values via `@ConfigProperty` + env vars
15. **GraalVM native** — avoid reflection; register classes in `reflect-config.json`; add `@RegisterForReflection` on new REST clients; verify Quarkus extension compatibility before adding deps

**Coverage requirement: minimum 80% line coverage** (enforced by SonarCloud quality gate)

### Framework rules (Java)
- Quarkus with Panache Active Record pattern for entities
- Use @ApplicationScoped beans, avoid @RequestScoped unless necessary
- Hibernate Reactive — all DB calls must return Uni<> or Multi<>
- GraalVM native: avoid reflection; register classes in reflect-config.json

### Gradle (`/backend`)
- Run: `./gradlew quarkusDev` (hot reload enabled)
- Test: `./gradlew test` — use @QuarkusTest, inject real beans
- Never use `gradlew` directly on Windows; always `./gradlew`

### Postgres
- Migrations via liquibase in `src/main/resources/db/migration/db.changelog-master.xml`
- Naming: V{version}__{description}.sql
- Connection pool: configured via `application.properties`, not code

### Frontend (SolidJS) (`/frontend`)
1. Use SolidJS signals and stores — never useState patterns
2. `createResource()` for data fetching; wrap in try/catch, surface errors via `createSignal([data, error])`
3. `createMemo` over derived signals for expensive computations; `createStore` for complex state, signals for simple values
4. Always `splitProps` when destructuring props to preserve reactivity
5. Component files: PascalCase; co-locate styles when < 20 lines
6. Tailwind v4: use CSS variables for theming, not arbitrary values; shadcn components must use project's Tailwind CSS variables
7. shadcn components via CDN: import from `@/components/ui/`
8. Routing: @solidjs/router with file-based routes in `src/routes/`

### Patterns (SolidJS) (`/frontend`)
- createResource() for data fetching, not useEffect equivalents
- Component files: PascalCase, co-locate styles when < 20 lines
- API calls: always go through `src/lib/api.ts` — never fetch() directly
