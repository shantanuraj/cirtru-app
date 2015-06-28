//
//  InstallationManager.m
//  Trios
//
//  Created by Shantanu Raj on 18/06/15.
//  Copyright (c) 2015 Cirtru. All rights reserved.
//
#import <Parse/Parse.h>
#import "InstallationManager.h"

@implementation InstallationManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(subscribeUserToChannel:(NSString *) channel) {
  PFInstallation *currentInstallation = [PFInstallation currentInstallation];
  if (currentInstallation[@"deviceToken"]) {
    [currentInstallation addUniqueObject:channel forKey:@"channels"];
    [currentInstallation saveInBackground];
  }
};

@end