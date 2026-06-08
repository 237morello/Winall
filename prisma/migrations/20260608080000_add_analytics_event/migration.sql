CREATE TABLE "analytics_event" (
    "id" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "route" TEXT,
    "userId" TEXT,
    "role" "Role",
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_event_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "analytics_event_eventName_idx" ON "analytics_event"("eventName");
CREATE INDEX "analytics_event_route_idx" ON "analytics_event"("route");
CREATE INDEX "analytics_event_userId_idx" ON "analytics_event"("userId");
CREATE INDEX "analytics_event_role_idx" ON "analytics_event"("role");
CREATE INDEX "analytics_event_createdAt_idx" ON "analytics_event"("createdAt");

ALTER TABLE "analytics_event" ADD CONSTRAINT "analytics_event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
