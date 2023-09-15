<template>
  <div class="markdown-body" style="text-align: left;">
    <WebsiteDescription v-if="showMarkdownId == 1"/>
    <QuickStart v-if="showMarkdownId == 2"/>
    <CreateTeam v-if="showMarkdownId == 21"/>
    <CreateProject v-if="showMarkdownId == 22"/>
    <CreateModel v-if="showMarkdownId == 23"/>
    <ProjectDocument v-if="showMarkdownId == 24"/>
    <EnterChat v-if="showMarkdownId == 25"/>
    <Instructions v-if="showMarkdownId == 3"/>
    <PersonalManagement v-if="showMarkdownId == 31"/>
    <AccountLogin v-if="showMarkdownId == 311"/>
    <PersonalCenter v-if="showMarkdownId == 312"/>
    <GroupManagement v-if="showMarkdownId == 32"/>
    <InviteNewMember v-if="showMarkdownId == 321"/>
    <AuthorityManagement v-if="showMarkdownId == 322"/>
    <ProjectManagement v-if="showMarkdownId == 33"/>
    <CreateProject v-if="showMarkdownId == 331"/>
    <DesignModel v-if="showMarkdownId == 332"/>
    <ProjectDocument v-if="showMarkdownId == 333"/>
    <ChatRoom v-if="showMarkdownId == 34"/>
    <ChatFuction v-if="showMarkdownId == 341"/>
    <ChangeChat v-if="showMarkdownId == 342"/>
    <ChatManagement v-if="showMarkdownId == 343"/>
  </div>
</template>

<script>
import mdProductOverview from '@/assets/markdown/test.md';
import AccountLogin from '@/assets/markdown/AccountLogin.md';
import AuthorityManagement from '@/assets/markdown/AuthorityManagement.md';
import ChangeChat from '@/assets/markdown/ChangeChat.md';
import ChatFuction from '@/assets/markdown/ChatFuction.md';
import CreateModel from '@/assets/markdown/CreateModel.md';
import CreateProject from '@/assets/markdown/CreateProject.md';
import CreateTeam from '@/assets/markdown/CreateTeam.md';
import DesignModel from '@/assets/markdown/DesignModel.md';
import EnterChat from '@/assets/markdown/EnterChat.md';
import InviteNewMember from '@/assets/markdown/InviteNewMember.md';
import PersonalCenter from '@/assets/markdown/PersonalCenter.md';
import ProjectDocument from '@/assets/markdown/ProjectDocument.md';
import WebsiteDescription from '@/assets/markdown/WebsiteDescription.md';
import ChatManagement from '@/assets/markdown/ChatManagement.md';
import QuickStart from '@/assets/markdown/QuickStart.md';
import Instructions from '@/assets/markdown/Instructions.md';
import PersonalManagement from '@/assets/markdown/PersonalManagement.md';
import GroupManagement from '@/assets/markdown/GroupManagement.md';
import ProjectManagement from '@/assets/markdown/ProjectManagement.md';
import ChatRoom from '@/assets/markdown/ChatRoom.md';

import 'highlight.js/styles/github.css';
import 'github-markdown-css';
import { number } from 'mathjs';
export default {
  components: {
    mdProductOverview, AccountLogin, AuthorityManagement, 
    ChangeChat, ChatFuction, CreateModel, CreateProject,
    CreateTeam, DesignModel, EnterChat, InviteNewMember,
    PersonalCenter, ProjectDocument, WebsiteDescription, 
    ChatManagement, QuickStart, Instructions, PersonalManagement,
    GroupManagement, ProjectManagement, ChatRoom
  },
  props: {
    showMarkdownId: number
  },
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style>
</style>