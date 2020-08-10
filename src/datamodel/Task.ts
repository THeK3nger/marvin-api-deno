export interface MarvinTask {
  done: boolean;
  day: string;
  title: string; // supports some autocompletion (parent, day, dueDate, plannedWeek, plannedMonth, timeEstimate, labels, isStarred)
  parentId: string; // ID of parent category/project
  labelIds: string[]; // IDs of labels
  firstScheduled: string;
  rank: number;
  dailySection: string;
  note: string;
  dueDate: string;
  timeEstimate: number; //ms
  isReward: boolean;
  isStarred: number;
  isFrogged: number;
  plannedWeek: string;
  plannedMonth: string;

  // Time offset in minutes
  //
  // Added to time to fix time zone issues.  So if the user is in Pacific time,
  // this would be -8*60.  If the user added a task with +today at 22:00 local
  // time 2019-12-05, then we want to create the task on 2019-12-05 and not
  // 2019-12-06 (which is the server date).
  timeZoneOffset: 60;
}
