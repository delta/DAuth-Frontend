<style>
  a:link,
  a:visited {
    font-family: sans-serif;
    color: #3bbf3b;
    text-decoration: none;
    word-break: break-all;
  }
</style>

<script>
  import { axiosInstance } from '../../src/utils/axios';
  import { fetchUserData } from '../utils/user';
  import { toasts } from 'svelte-toasts';
  import config from '../../env';
  import { getContext } from 'svelte';
  import {
    Button,
    Dialog,
    Card,
    CardTitle,
    CardText,
    CardActions
  } from 'svelte-materialify';

  export let accessGivenOn;
  export let homePageUrl;
  export let clientId;
  export let clientName;
  export let description;

  let active = false; //dialog 
  let { theme } = getContext('theme');

  function removeAccess() {
    active = false;
    axiosInstance({
      method: 'post',
      url: `${config.backendurl}/user/remove-access`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        clientId: clientId
      }
    })
      .then(response => {
        toasts.add({
          description: response.data.message,
          duration: 10000,
          placement: 'bottom-right',
          type: 'success',
          showProgress: true,
          theme: $theme.name
        });
        fetchUserData();
      })
      .catch(error => {
        toasts.add({
          title: 'Oops',
          description: error.response.data.message,
          duration: 10000,
          placement: 'bottom-right',
          type: 'error',
          showProgress: true,
          theme: $theme.name
        });
      });
  }

  function open() {
    active = true;
  }
</script>

{#if $theme.name == 'dark'}
  <Card
    style="padding:1rem;text-align:center;font-family:sans-serif;display:flex;flex-wrap:wrap;background:#313131"
  >
    <CardTitle style="width:100%;justify-content:center;word-break:break-all;"
      ><b>{clientName}</b></CardTitle
    >
    <CardText style="word-break:break-all;">
      Access given on<br />{accessGivenOn}
      <br />
      <a href={homePageUrl}>{homePageUrl}</a>
      <br />
      {description}
      <br/>
      <button
        style="background:none;border:none;color:#ff6347;font-size:1rem;font-family:sans-serif;margin:10px;"
        on:click={open}><b>Remove access</b></button
      >
    </CardText>
  </Card>
{:else}
  <Card
    style="padding:1rem;text-align:center;font-family:sans-serif;display:flex;flex-wrap:wrap;"
  >
    <CardTitle style="width:100%;justify-content:center;word-break:break-all;"
      ><b>{clientName}</b></CardTitle
    >
    <CardText style="word-break:break-all;">
      Access given on<br />{accessGivenOn}
      <br />
      <a href={homePageUrl}>{homePageUrl}</a>
      <br />
      {description}
      <br/>
      <button
        style="background:none;border:none;color:#d0312d;font-size:1rem;font-family:sans-serif;margin:10px;"
        on:click={open}><b>Remove access</b></button
      >
    </CardText>
  </Card>
{/if}

{#if $theme.name == 'dark'}
  <Dialog bind:active>
    <Card style="display:flex;flex-wrap:wrap;background:#212121;padding:4px;">
      <CardTitle style="color:crimson"><b>Remove access?</b></CardTitle>
      <CardText style="word-break:break-all;">
        {clientName} will no longer have access to your DAuth account. You'll have to grant
        permission if you want to use the service again.
      </CardText>
      <CardActions style="width:100%;justify-content: center;">
        <Button on:click={removeAccess} text style="border:solid;border-color:crimson;border-radius:5px;background:none;margin-bottom:1rem;color:#f1f1f1"
          >Remove</Button
        >
      </CardActions>
    </Card>
  </Dialog>
{:else}
  <Dialog bind:active>
    <Card style="display:flex;flex-wrap:wrap;background:#f1f1f1;padding:4px;">
      <CardTitle style="color:crimson"><b>Remove access?</b></CardTitle>
      <CardText  style="word-break:break-all;">
        {clientName} will no longer have access to your DAuth account. You'll have to grant
        permission if you want to use the service again.
      </CardText>
      <CardActions style="width:100%;justify-content: center;">
        <Button on:click={removeAccess} text style="border:solid;border-color:crimson;border-radius:5px;background:none;margin-bottom:1rem;"
          >Remove</Button
        >
      </CardActions>
    </Card>
  </Dialog>
{/if}
