/// <reference types="astro/client" />

declare namespace Astro {
  interface locals {
    session: import('lucia').Session | null
    user: import('lucia').User | null
  }
}
