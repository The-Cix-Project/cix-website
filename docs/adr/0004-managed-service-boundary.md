# ADR 0004: Host policy, containerised protocol services

- Status: Accepted
- Date: 2026-09-01
- Evidence: [`43c3657`](https://github.com/The-Cix-Project/cix-website/commit/43c3657)

## Decision

Describe managed DNS, LDAP, DHCP, NTP, and syslog as host-owned intent and lifecycle projected into replaceable service containers. Do not claim those protocol implementations are built into the host.

## Consequences

The Services page can explain the boundary precisely: policy and integration stay with Cix; protocol servers remain replaceable workloads.
