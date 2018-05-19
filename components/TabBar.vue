<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
        <nuxt-link class="navbar-brand" to="/">Dev-tools</nuxt-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarToggler">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/time">Time</nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/base64">Base64</nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/json">Json</nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/php">PHP</nuxt-link>
                </li>
            </ul>
        </div>
    </nav>
</template>