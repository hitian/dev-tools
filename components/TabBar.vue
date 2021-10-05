<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">Dev Tools</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/time">Time & Timestamp</b-nav-item>
        <b-nav-item to="/base64">Base64 encode & decode</b-nav-item>
        <b-nav-item to="/json">Json tree view</b-nav-item>
        <b-nav-item to="/php">PHP serialize</b-nav-item>
        <b-nav-item to="/url">URL encode & decode</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>